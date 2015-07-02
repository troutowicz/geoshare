import autoPrefix from 'material-ui/lib/styles/auto-prefix';
import extend from 'material-ui/lib/utils/extend';

export function mergeAndPrefix() {
  const args = Array.prototype.slice.call(arguments, 0);
  let base = args[0];
  let i;

  for (i = 1; i < args.length; i++) {
    if (args[i]) {
      base = extend(base, args[i]);
    }
  }

  return autoPrefix.all(base);
}
