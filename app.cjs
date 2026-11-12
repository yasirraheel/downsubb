// LiteSpeed loads its startup file through CommonJS require().
import('./server.mjs').catch((e) => {
  console.error('SubDown startup failed.', e);
  process.exit(1);
});
