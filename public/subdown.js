// SubDown — OUR OWN backend. Template design is the exact SaveFrom
// capture the user sent; only the backend is ours (no SaveFrom API).
(function () {
  var form = document.getElementById('sf_form');
  var input = document.getElementById('sf_url');
  var result = document.getElementById('sf_result');
  if (!form || !input || !result) return;
  function esc(s){ return String(s||'').replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function show(html){ result.innerHTML = html; }
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var url = input.value.trim();
    if (!url) { show('<p>Please paste a video link first.</p>'); return; }
    show('<p>Checking the video, please wait...</p>');
    var info;
    try {
      var r = await fetch('/api/info', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url }) });
      info = await r.json();
      if (!r.ok) throw new Error(info.error || 'Could not check this link.');
    } catch (err) { show('<p>' + esc(err.message) + '</p>'); return; }
    var btns = (info.formats || []).map(function (f) {
      return '<button type="button" data-q="' + esc(f.height) + '" style="margin:4px;padding:10px 16px;cursor:pointer">' + esc(f.label) + '</button>';
    }).join('');
    show(
      '<div style="text-align:left">' +
      (info.thumbnail ? '<img src="' + esc(info.thumbnail) + '" alt="" style="max-width:100%;border-radius:8px">' : '') +
      '<h3>' + esc(info.title || 'Video') + '</h3>' +
      '<p>' + esc(info.platform || '') + (info.duration ? ' &bull; ' + Math.round(info.duration / 60) + ' min' : '') + '</p>' +
      '<p>Choose quality:</p><div>' + (btns || '<button type="button" data-q="best">Download</button>') + '</div>' +
      '<button type="button" data-q="audio" style="margin:4px;padding:10px 16px;cursor:pointer">MP3 Audio</button>' +
      '<p id="sd-status"></p></div>'
    );
    result.querySelectorAll('button[data-q]').forEach(function (b) {
      b.addEventListener('click', async function () {
        var st = document.getElementById('sd-status');
        st.textContent = 'Downloading on the server, please wait...';
        var job;
        try {
          var jr = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url, quality: b.getAttribute('data-q') }) });
          job = await jr.json();
          if (!jr.ok) throw new Error(job.error || 'Download failed to start.');
        } catch (err) { st.textContent = err.message; return; }
        var timer = setInterval(async function () {
          try {
            var pr = await fetch('/api/jobs/' + job.jobId);
            var j = await pr.json();
            if (j.status === 'ready') {
              clearInterval(timer);
              st.innerHTML = '<a href="/api/jobs/' + j.jobId + '/file" style="font-weight:bold">Download ' + esc(j.name || 'video') + ' (' + Math.round((j.size || 0) / 1048576 * 10) / 10 + ' MB)</a>';
            } else if (j.status === 'error') {
              clearInterval(timer);
              st.textContent = j.error || 'Download failed.';
            } else {
              st.textContent = 'Downloading on the server... ' + (j.progress || 0) + '%';
            }
          } catch (err) { clearInterval(timer); st.textContent = 'Connection lost. Please try again.'; }
        }, 2000);
      });
    });
  });
})();
