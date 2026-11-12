// SubDown — OUR OWN backend. Template design is the exact SaveFrom
// capture the user sent; only the backend is ours (no SaveFrom API).
(function () {
  // Mobile menu first: hamburger toggles the header nav. Wired here,
  // at the top, so it works even if later code in this file throws.
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', function () { document.body.classList.toggle('sd-nav-open'); });
  document.querySelectorAll('#nav_top a').forEach(function (a) { a.addEventListener('click', function () { document.body.classList.remove('sd-nav-open'); }); });

  // Inject our own styles at runtime, so the layout never depends on a
  // cached stylesheet: centred result, spinner, professional buttons.
  var css = '#sf_result{max-width:960px;margin:0 auto;width:100%;box-sizing:border-box;text-align:center;padding:0 12px}' +
    '.sd-card{margin:18px auto;padding:22px 20px;border:1px solid #e3e8e3;border-radius:14px;background:#fff;box-shadow:0 2px 14px rgba(0,0,0,.06);text-align:center}' +
    '.sd-card img{max-width:320px;max-height:240px;width:auto;height:auto;object-fit:contain;border-radius:10px;display:block;margin:0 auto 14px}' +
    '.sd-card h3{font-size:20px;line-height:1.4;margin:0 0 6px;color:#222}' +
    '.sd-meta{font-size:14px;color:#777;margin:0 0 14px}' +
    '.sd-q{display:inline-block;margin:5px;padding:11px 20px;cursor:pointer;border:none;border-radius:8px;background:#84bd07;color:#fff;font-size:15px;font-weight:700}' +
    '.sd-q:hover{background:#74a806}' +
    '.sd-mp3{display:inline-block;margin:5px;padding:11px 20px;cursor:pointer;border:2px solid #84bd07;border-radius:8px;background:#fff;color:#5a7d05;font-size:15px;font-weight:700}' +
    '.sd-status{margin:16px auto;padding:14px 18px;border:1px solid #d9e8d9;border-left:5px solid #84bd07;border-radius:10px;background:#f6fbf0;display:flex;align-items:center;justify-content:center;gap:12px;font-size:15px;color:#2f4d0a;text-align:left}' +
    '.sd-error{margin:16px auto;padding:16px 18px;border:1px solid #f5c2c7;border-left:5px solid #dc3545;border-radius:10px;background:#fff5f5;text-align:left}' +
    '.sd-spin{width:26px;height:26px;min-width:26px;border:3px solid #d9e8d9;border-top-color:#84bd07;border-radius:50%;animation:sd-rot 1s linear infinite}' +
    '@keyframes sd-rot{to{transform:rotate(360deg)}}' +
    '.sd-cancel{display:inline-block;margin:5px;padding:10px 18px;cursor:pointer;border:2px solid #dc3545;border-radius:8px;background:#fff;color:#b02a37;font-size:14px;font-weight:700}' +
    '.faq_item_title{cursor:pointer}' +
    '.sd-dl{display:inline-block;margin-top:10px;padding:13px 26px;background:#84bd07;color:#fff!important;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;max-width:100%;box-sizing:border-box;white-space:normal;overflow-wrap:anywhere;word-break:break-word;text-align:center;line-height:1.4}' +
    '@media (max-width:600px){.sd-card{padding:16px 12px;margin:14px auto}.sd-card h3{font-size:17px}.sd-card img{max-width:100%}.sd-q,.sd-mp3{padding:10px 13px;font-size:14px;margin:4px 3px}.sd-status{flex-wrap:wrap;justify-content:center;text-align:center}.sd-error{padding:14px}.sd-dl{padding:12px 16px;font-size:15px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---- Your downloads, kept in this browser (localStorage) ----
  // A refresh or a later visit still shows the video and its download
  // link, because the job id is deterministic (link + quality).
  var QKEY = 'subdown_queue';
  function loadQueue(){ try { return JSON.parse(localStorage.getItem(QKEY) || '[]'); } catch (e) { return []; } }
  function saveQueue(q){ try { localStorage.setItem(QKEY, JSON.stringify(q.slice(0, 5))); } catch (e) {} }
  function addToQueue(entry){
    var q = loadQueue().filter(function (x) { return x.jobId !== entry.jobId; });
    q.unshift(entry); saveQueue(q); renderQueue();
  }
  function queueBox(){
    var b = document.getElementById('sd-queue');
    if (!b) {
      b = document.createElement('div');
      b.id = 'sd-queue';
      b.style.cssText = 'max-width:960px;margin:18px auto 0;width:100%;box-sizing:border-box;text-align:left;padding:0 12px';
      result.parentNode.insertBefore(b, result.nextSibling);
    }
    return b;
  }
  async function renderQueue(){
    var q = loadQueue(); var box = queueBox();
    if (!q.length) { box.innerHTML = ''; return; }
    var rows = '';
    for (var i = 0; i < q.length; i++) {
      var e = q[i];
      rows += '<div data-job="' + esc(e.jobId) + '" style="display:flex;align-items:center;gap:12px;padding:12px 14px;margin:8px 0;border:1px solid #e3e8e3;border-radius:10px;background:#fff">' +
        '<div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(e.title || 'Video') + '</div>' +
        '<div class="sd-qstatus" style="font-size:13px;color:#777">Checking...</div></div>' +
        '<span class="sd-qact"></span></div>';
    }
    box.innerHTML = '<div style="font-size:16px;font-weight:700;margin-bottom:4px">Your downloads</div>' + rows;
    q.forEach(function (e) { pollQueueEntry(e); });
  }
  async function pollQueueEntry(e, fails){
    fails = fails || 0;
    var row = document.querySelector('[data-job="' + e.jobId + '"]');
    if (!row) return;
    var stEl = row.querySelector('.sd-qstatus'), actEl = row.querySelector('.sd-qact');
    try {
      var pr = await fetch('/api/jobs/' + e.jobId);
      if (pr.status === 404) { stEl.textContent = 'Expired - start it again from the link above'; actEl.innerHTML = '<button type="button" class="sd-mp3" style="padding:9px 14px;font-size:14px" data-retry="' + esc(e.jobId) + '">Download again</button>'; return; }
      if (!pr.ok) throw new Error('gone');
      var j = await pr.json();
      if (j.status === 'ready') {
        stEl.textContent = 'Ready - ' + Math.round((j.size || 0) / 1048576 * 10) / 10 + ' MB';
        actEl.innerHTML = '<a class="sd-dl" style="margin-top:0;padding:9px 18px;font-size:14px" href="/api/jobs/' + j.jobId + '/file">Download</a>';
      } else if (j.status === 'error') {
        stEl.textContent = 'Interrupted';
        actEl.innerHTML = '<button type="button" class="sd-mp3" style="padding:9px 14px;font-size:14px" data-retry="' + esc(e.jobId) + '">Download again</button>';
      } else if (j.status === 'cancelled') {
        stEl.textContent = 'Cancelled';
        actEl.innerHTML = '<button type="button" class="sd-mp3" style="padding:9px 14px;font-size:14px" data-retry="' + esc(e.jobId) + '">Download again</button>';
      } else {
        stEl.innerHTML = '<span class="sd-spin" style="display:inline-block;vertical-align:-7px;width:18px;height:18px;min-width:18px"></span> Downloading... ' + (j.progress || 0) + '%';
        actEl.innerHTML = '<button type="button" class="sd-cancel" style="padding:9px 14px" data-cancel="' + esc(e.jobId) + '">Cancel</button>';
        setTimeout(function () { pollQueueEntry(e, 0); }, 3000);
      }
    } catch (err) {
      // Network lost or server hiccup: the download keeps running on the
      // server, so keep retrying instead of declaring it dead.
      if (fails < 5) {
        stEl.textContent = 'Connection lost, retrying...';
        setTimeout(function () { pollQueueEntry(e, fails + 1); }, 3000);
      } else {
        stEl.textContent = 'Expired - start it again from the link above';
        actEl.innerHTML = '<button type="button" class="sd-mp3" style="padding:9px 14px;font-size:14px" data-retry="' + esc(e.jobId) + '">Download again</button>';
      }
    }
  }
  document.addEventListener('click', async function (ev) {
    var b = ev.target.closest ? ev.target.closest('[data-retry]') : null;
    if (!b) return;
    var q = loadQueue(); var e = null;
    q.forEach(function (x) { if (x.jobId === b.getAttribute('data-retry')) e = x; });
    if (!e) return;
    input.value = e.url; form.dispatchEvent(new Event('submit', { cancelable: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var timers = {}; // jobId -> interval id
  function stopPoll(jobId){ if (timers[jobId]) { clearInterval(timers[jobId]); delete timers[jobId]; } }
  async function cancelJob(jobId){
    stopPoll(jobId);
    try { await fetch('/api/jobs/' + jobId, { method: 'DELETE' }); } catch (e) {}
    saveQueue(loadQueue().filter(function (x) { return x.jobId !== jobId; }));
    renderQueue();
  }
  document.addEventListener('click', function (ev) {
    var faq = ev.target.closest ? ev.target.closest('.faq_item_title') : null;
    if (faq) { var item = faq.closest('.faq_item'); if (item) item.classList.toggle('active'); return; }
    var b = ev.target.closest ? ev.target.closest('[data-cancel]') : null;
    if (!b) return;
    var id = b.getAttribute('data-cancel');
    var stEl = document.getElementById('sd-status');
    if (stEl) stEl.innerHTML = '<div class="sd-status">Download cancelled.</div>';
    cancelJob(id);
  });

  var form = document.getElementById('sf_form');
  var input = document.getElementById('sf_url');
  var result = document.getElementById('sf_result');
  if (!form || !input || !result) return;
  renderQueue();
  function esc(s){ return String(s||'').replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function show(html){ result.innerHTML = html; }
  function errorBox(msg){
    show('<div class="sd-error">' +
      '<div style="font-size:18px;font-weight:700;color:#842029;margin-bottom:6px">Couldn\'t download this video</div>' +
      '<div style="font-size:15px;color:#5b2a2e;line-height:1.5">' + esc(msg) + '</div>' +
      '<div style="font-size:13px;color:#8a6d6d;margin-top:10px">Tip: copy the link again from the video page and make sure it opens in your browser first, then try again.</div></div>');
  }
  function statusBox(msg){
    show('<div class="sd-status"><span class="sd-spin"></span><span>' + esc(msg) + '</span></div>');
  }
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var url = input.value.trim();
    if (!url) { errorBox('Please paste a video link first.'); return; }
    statusBox('Checking the video, please wait...');
    var info;
    try {
      var r = await fetch('/api/info', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url }) });
      info = await r.json();
      if (!r.ok) throw new Error(info.error || 'Could not check this link.');
    } catch (err) { errorBox(err.message); return; }
    var btns = (info.formats || []).map(function (f) {
      return '<button type="button" class="sd-q" data-q="' + esc(f.height) + '">' + esc(f.label) + '</button>';
    }).join('');
    show(
      '<div class="sd-card">' +
      (info.thumbnail ? '<img src="' + esc(info.thumbnail) + '" alt="" referrerpolicy="no-referrer" onerror="this.style.display=\'none\'">' : '') +
      '<h3>' + esc(info.title || 'Video') + '</h3>' +
      '<p class="sd-meta">' + esc(info.platform || '') + (info.duration ? ' &bull; ' + Math.round(info.duration / 60) + ' min' : '') + '</p>' +
      '<p style="font-weight:700;margin:0 0 6px">Choose quality:</p><div>' + (btns || '<button type="button" class="sd-q" data-q="best">Download</button>') + '</div>' +
      '<button type="button" class="sd-mp3" data-q="audio">MP3 Audio</button>' +
      '<p id="sd-status"></p></div>'
    );
    renderQueue();
    result.querySelectorAll('button[data-q]').forEach(function (b) {
      b.addEventListener('click', async function () {
        var stEl = document.getElementById('sd-status');
        stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Downloading on the server, please wait...</span></div>';
        var job;
        try {
          var jr = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url, quality: b.getAttribute('data-q') }) });
          job = await jr.json();
          if (!jr.ok) throw new Error(job.error || 'Download failed to start.');
          addToQueue({ jobId: job.jobId, url: url, title: info.title || 'Video', quality: b.getAttribute('data-q'), createdAt: Date.now() });
        } catch (err) { errorBox(err.message); return; }
        timers[job.jobId] = setInterval(async function () {
          try {
            var pr = await fetch('/api/jobs/' + job.jobId);
            if (!pr.ok) { stopPoll(job.jobId); errorBox('Download was interrupted. Please click the quality button again, it will resume from where it stopped.'); return; }
            var j = await pr.json();
            if (!j.status) { stopPoll(job.jobId); errorBox('Download was interrupted. Please click the quality button again, it will resume from where it stopped.'); return; }
            if (j.status === 'ready') {
              stopPoll(job.jobId);
              var mb = Math.round((j.size || 0) / 1048576 * 10) / 10;
              var dlLabel = window.innerWidth <= 600 ? 'Download (' + mb + ' MB)' : 'Download ' + esc(j.name || 'video') + ' (' + mb + ' MB)';
              stEl.innerHTML = '<a class="sd-dl" href="/api/jobs/' + j.jobId + '/file">' + dlLabel + '</a>' + (window.innerWidth <= 600 ? '<div style="font-size:12px;color:#777;margin-top:6px;overflow-wrap:anywhere">' + esc(j.name || '') + '</div>' : '');
              renderQueue();
            } else if (j.status === 'error') {
              stopPoll(job.jobId);
              errorBox(j.error || 'Download failed.');
            } else if (j.status === 'cancelled') {
              stopPoll(job.jobId);
              stEl.innerHTML = '<div class="sd-status">Download cancelled.</div>';
            } else {
              stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Downloading on the server... ' + (j.progress || 0) + '%</span><button type="button" class="sd-cancel" data-cancel="' + esc(job.jobId) + '">Cancel</button></div>';
            }
          } catch (err) {
            // Network lost: the server keeps downloading, so just keep
            // polling instead of showing an error and giving up.
            stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Connection lost, retrying... the server keeps downloading.</span></div>';
          }
        }, 2000);
      });
    });
  });
})();

// Clicking any platform icon focuses the link box so you can paste its link.
  document.querySelectorAll('.sd-float, .sd-hero-icons span, .footer_v2 span').forEach(function (el) {
    el.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); var inp = document.getElementById('sf_url'); if (inp) inp.focus(); });
  });
