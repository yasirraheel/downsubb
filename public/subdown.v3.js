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
    '.sd-card img{max-width:320px;max-height:240px;width:auto;height:auto;object-fit:contain;border-radius:10px;display:block;margin:0 auto 14px;background:#eef1ee}' +
    '.sd-skel{margin:18px auto;padding:22px 20px;border:1px solid #e3e8e3;border-radius:14px;background:#fff;box-shadow:0 2px 14px rgba(0,0,0,.06);text-align:center}' +
    '.sd-skel-thumb{width:320px;max-width:100%;height:180px;margin:0 auto 14px;border-radius:10px;background:#eef1ee;display:flex;align-items:center;justify-content:center;animation:sd-pulse 1.4s ease-in-out infinite}' +
    '.sd-skel-line{height:14px;border-radius:7px;background:#eef1ee;margin:0 auto 10px;animation:sd-pulse 1.4s ease-in-out infinite}' +
    '.sd-skel-btn{display:inline-block;width:86px;height:40px;border-radius:8px;background:#eef1ee;margin:5px;animation:sd-pulse 1.4s ease-in-out infinite}' +
    '@keyframes sd-pulse{0%,100%{opacity:1}50%{opacity:.55}}' +
    '.sd-card h3{font-size:20px;line-height:1.4;margin:0 0 6px;color:#222}' +
    '.sd-meta{font-size:14px;color:#777;margin:0 0 14px}' +
    '.sd-q{display:inline-block;margin:5px;padding:11px 20px;cursor:pointer;border:none;border-radius:8px;background:#84bd07;color:#fff;font-size:15px;font-weight:700}' +
    '.sd-q:hover{background:#74a806}' +
    '.sd-mp3{display:inline-block;margin:5px;padding:11px 20px;cursor:pointer;border:2px solid #84bd07;border-radius:8px;background:#fff;color:#5a7d05;font-size:15px;font-weight:700}' +
    '.sd-status{margin:16px auto;padding:0;border:0;border-radius:0;background:none;display:flex;align-items:center;justify-content:center;gap:12px;font-size:15px;color:#2f4d0a;text-align:left}' +
    '.sd-error{margin:16px auto;padding:16px 18px;border:1px solid #f5c2c7;border-left:5px solid #dc3545;border-radius:10px;background:#fff5f5;text-align:left}' +
    '.sd-spin{width:26px;height:26px;min-width:26px;border:3px solid #d9e8d9;border-top-color:#84bd07;border-radius:50%;animation:sd-rot 1s linear infinite}' +
    '@keyframes sd-rot{to{transform:rotate(360deg)}}' +
    '.sd-cancel{display:inline-block;margin:5px;padding:10px 18px;cursor:pointer;border:2px solid #dc3545;border-radius:8px;background:#fff;color:#b02a37;font-size:14px;font-weight:700}' +
    '.faq_item_title{cursor:pointer}' +
    '.sd-dl{display:inline-block;margin-top:10px;padding:13px 26px;background:#84bd07;color:#fff!important;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;max-width:100%;box-sizing:border-box;white-space:normal;overflow-wrap:anywhere;word-break:break-word;text-align:center;line-height:1.4}' +
    '@media (max-width:600px){.sd-card{padding:16px 12px;margin:14px auto}.sd-card h3{font-size:17px}.sd-card img{max-width:100%}.sd-q,.sd-mp3{padding:10px 13px;font-size:14px;margin:4px 3px}.sd-status{flex-wrap:wrap;justify-content:center;text-align:center}.sd-error{padding:14px}.sd-dl{padding:12px 16px;font-size:15px}}' +
    '.sd-cookie{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;padding:12px;box-sizing:border-box;pointer-events:none}' +
    '.sd-cookie-in{pointer-events:auto;max-width:960px;width:100%;background:#fff;border:1px solid #e3e8e3;border-radius:14px;box-shadow:0 4px 24px rgba(0,0,0,.14);padding:14px 18px;display:flex;align-items:center;gap:14px;box-sizing:border-box}' +
    '.sd-cookie-t{flex:1;font-size:14px;line-height:1.5;color:#444;text-align:left}' +
    '.sd-cookie-t b{color:#222}' +
    '.sd-cookie-a{flex:0 0 auto;display:flex;gap:8px;align-items:center}' +
    '.sd-cookie-ok{border:0;background:#84bd07;color:#fff;font-weight:700;font-size:14px;padding:10px 20px;border-radius:8px;cursor:pointer}' +
    '.sd-cookie-no{border:2px solid #e3e3e3;background:#fff;color:#555;font-weight:700;font-size:14px;padding:8px 16px;border-radius:8px;cursor:pointer}' +
    '@media (max-width:600px){.sd-cookie{padding:8px}.sd-cookie-in{flex-wrap:wrap;gap:10px;padding:12px 14px}.sd-cookie-t{font-size:13px;flex:1 1 100%}.sd-cookie-a{flex:1 1 100%;justify-content:flex-end}}';
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
        (e.thumbnail ? '<img src="' + thumbSrc(e.thumbnail, e.url) + '" alt="" referrerpolicy="no-referrer" onerror="this.style.display=\'none\'" style="width:64px;height:36px;object-fit:cover;border-radius:6px;flex:0 0 auto">' : '') +
        '<div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(e.title || 'Video') + '</div>' +
        '<div class="sd-qstatus" style="font-size:13px;color:#777">Checking...</div></div>' +
        '<span class="sd-qact"></span><button type="button" class="sd-qdel" data-del="' + esc(e.jobId) + '" title="Remove from history" aria-label="Remove from history" style="border:0;background:transparent;color:#999;font-size:18px;line-height:1;cursor:pointer;padding:6px;flex:0 0 auto">✕</button></div>';
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
      var pr = await fetch('/api/jobs/' + e.jobId, { cache: 'no-store' });
      // A 404 can be a stale cached answer right after the job was
      // recreated (same id), or a short server hiccup: retry like any
      // other failure instead of declaring it expired at once.
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
      } else if (j.status === 'queued') {
        stEl.innerHTML = '<span class="sd-spin" style="display:inline-block;vertical-align:-7px;width:18px;height:18px;min-width:18px"></span> Queued - #' + (j.queuePosition || 1) + ' in line';
        actEl.innerHTML = '<button type="button" class="sd-cancel" style="padding:9px 14px" data-cancel="' + esc(e.jobId) + '">Cancel</button>';
        setTimeout(function () { pollQueueEntry(e, 0); }, 3000);
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
  // Remove from local history only: the server keeps the download and
  // its file, this just takes the row out of this browser's list.
  function removeFromQueue(jobId){
    saveQueue(loadQueue().filter(function (x) { return x.jobId !== jobId; }));
    renderQueue();
  }
  document.addEventListener('click', function (ev) {
    var faq = ev.target.closest ? ev.target.closest('.faq_item_title') : null;
    if (faq) { var item = faq.closest('.faq_item'); if (item) { var wasOpen = item.classList.contains('active'); document.querySelectorAll('.faq_item.active').forEach(function (x) { x.classList.remove('active'); }); if (!wasOpen) item.classList.add('active'); } return; }
    var d = ev.target.closest ? ev.target.closest('[data-del]') : null;
    if (d) { removeFromQueue(d.getAttribute('data-del')); return; }
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
  // Paste button: small white pill inside the input, shown INSTEAD of the
  // submit arrow while the input is empty; once a URL is in the box the
  // arrow comes back and Paste disappears. Only one is visible at a time.
  var submitBtn = document.getElementById('sf_submit');
  var pasteBtn = document.getElementById('sf_paste');
  function syncPasteBtn() {
    var hasUrl = !!(input.value && input.value.trim());
    if (pasteBtn) pasteBtn.style.display = hasUrl ? 'none' : '';
    if (submitBtn) submitBtn.style.display = hasUrl ? '' : 'none';
    if (form) form.classList.toggle('has-paste', !hasUrl);
  }
  input.addEventListener('input', syncPasteBtn);
  syncPasteBtn();
  // Paste only if the clipboard holds a URL; anything else is ignored.
  function pickUrlFromClipboard(text) {
    if (!text) return '';
    var t = text.trim();
    if (!t) return '';
    var m = t.match(/https?:\/\/[^\s"'<>]+/);
    if (m) return m[0].replace(/[.,;:!?)]+$/, '');
    if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(t)) return 'https://' + t;
    return '';
  }
  if (pasteBtn) {
    pasteBtn.addEventListener('click', async function () {
      var text = '';
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          text = await navigator.clipboard.readText();
        }
      } catch (e) { text = ''; }
      var url = pickUrlFromClipboard(text);
      if (!url) return; // clipboard has no URL: ignore
      input.value = url;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    });
  }
  renderQueue();
  function esc(s){ return String(s||'').replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  // Covers load through our server (/api/thumb): some thumbnail CDNs
  // are blocked in the user's country, so the browser would show no
  // preview even though the video itself downloads fine.
  function thumbSrc(thumb, page){ if (!thumb) return ''; return '/api/thumb?url=' + encodeURIComponent(thumb) + (page ? '&page=' + encodeURIComponent(page) : ''); }
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
  // Preview loading placeholder: a skeleton of the result card (grey
  // thumbnail block with a spinner, title lines, quality buttons) so
  // the user can see at once that the preview is loading.
  function loadingBox(){
    show('<div class="sd-skel">' +
      '<div class="sd-skel-thumb"><span class="sd-spin"></span></div>' +
      '<div class="sd-skel-line" style="width:70%"></div>' +
      '<div class="sd-skel-line" style="width:40%"></div>' +
      '<div style="margin-top:14px"><span class="sd-skel-btn"></span><span class="sd-skel-btn"></span><span class="sd-skel-btn"></span></div>' +
      '<div style="font-size:14px;color:#777;margin-top:14px">Loading preview...</div>' +
      '</div>');
  }
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var url = input.value.trim();
    if (!url) { errorBox('Please paste a video link first.'); return; }
    loadingBox();
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
      (info.thumbnail ? '<img src="' + thumbSrc(info.thumbnail, url) + '" alt="" referrerpolicy="no-referrer" onerror="this.style.display=\'none\'">' : '') +
      '<h3>' + esc(info.title || 'Video') + '</h3>' +
      '<p class="sd-meta">' + esc(info.platform || '') + (info.duration ? ' &bull; ' + Math.round(info.duration / 60) + ' min' : '') + '</p>' +
      '<p style="font-weight:700;margin:0 0 6px">' + (info.audioOnly ? 'Audio:' : info.mediaKind === 'image' ? 'Choose image:' : info.mediaKind === 'document' ? 'Choose file:' : 'Choose quality:') + '</p><div>' + (btns || '<button type="button" class="sd-q" data-q="best">Download</button>') + '</div>' +
      (info.audioOnly || info.noAudio ? '' : '<button type="button" class="sd-mp3" data-q="audio">MP3 Audio</button>') +
      '<p id="sd-status"></p></div>'
    );
    renderQueue();
    result.querySelectorAll('button[data-q]').forEach(function (b) {
      b.addEventListener('click', async function () {
        var stEl = document.getElementById('sd-status');
        stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Preparing your download, please wait...</span></div>';
        var job;
        try {
          var jr = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url, quality: b.getAttribute('data-q') }) });
          job = await jr.json();
          if (!jr.ok) throw new Error(job.error || 'Download failed to start.');
          addToQueue({ jobId: job.jobId, url: url, title: info.title || 'Video', thumbnail: info.thumbnail || '', quality: b.getAttribute('data-q'), createdAt: Date.now() });
        } catch (err) { errorBox(err.message); return; }
        var fails = 0;
        timers[job.jobId] = setInterval(async function () {
          try {
            var pr = await fetch('/api/jobs/' + job.jobId, { cache: 'no-store' });
            if (!pr.ok) {
              // One bad poll must not kill the download: the server keeps
              // it running. A 404 right after a recreate can also be a
              // stale cached answer, so retry that too and only give up
              // after several misses in a row.
              fails++;
              if (pr.status === 404 && fails >= 5) { stopPoll(job.jobId); errorBox('Download was interrupted. Please click the quality button again, it will resume from where it stopped.'); return; }
              stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Connection lost, retrying... your download will continue.</span></div>';
              return;
            }
            var j = await pr.json();
            if (!j.status) { fails++; stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Connection lost, retrying... your download will continue.</span></div>'; return; }
            fails = 0;
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
            } else if (j.status === 'queued') {
              stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Waiting in line... you are number ' + (j.queuePosition || 1) + ' in the queue. Your download will start automatically, please wait.</span><button type="button" class="sd-cancel" data-cancel="' + esc(job.jobId) + '">Cancel</button></div>';
            } else {
              stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Preparing your download... ' + (j.progress || 0) + '%</span><button type="button" class="sd-cancel" data-cancel="' + esc(job.jobId) + '">Cancel</button></div>';
            }
          } catch (err) {
            // Network lost: the server keeps downloading, so just keep
            // polling instead of showing an error and giving up.
            stEl.innerHTML = '<div class="sd-status"><span class="sd-spin"></span><span>Connection lost, retrying... your download will continue.</span></div>';
          }
        }, 2000);
      });
    });
  });

  // Cookie consent: a small bottom banner, only for new visitors.
  // It never blocks the page and remembers the choice in this browser.
  try {
    if (!localStorage.getItem('vidsnap_consent')) {
      var cb = document.createElement('div');
      cb.className = 'sd-cookie';
      cb.innerHTML = '<div class="sd-cookie-in"><div class="sd-cookie-t"><b>Your privacy matters.</b> VidSnap uses cookies and local storage only to remember your downloads and keep the site working smoothly. No tracking, no ads.</div><div class="sd-cookie-a"><button type="button" class="sd-cookie-no">Decline</button><button type="button" class="sd-cookie-ok">Accept</button></div></div>';
      document.body.appendChild(cb);
      cb.querySelector('.sd-cookie-ok').addEventListener('click', function () { try { localStorage.setItem('vidsnap_consent', 'accepted'); } catch (e) {} cb.remove(); });
      cb.querySelector('.sd-cookie-no').addEventListener('click', function () { try { localStorage.setItem('vidsnap_consent', 'declined'); } catch (e) {} cb.remove(); });
    }
  } catch (e) {}
})();

// Clicking any platform icon focuses the link box so you can paste its link.
  document.querySelectorAll('.sd-float, .sd-hero-icons span, .footer_v2 span').forEach(function (el) {
    el.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); var inp = document.getElementById('sf_url'); if (inp) inp.focus(); });
  });
