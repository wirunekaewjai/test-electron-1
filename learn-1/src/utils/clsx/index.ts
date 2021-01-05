import { Param } from './types';

export default function clsx (...params: Param[])
{
  const classes: string[] = [];

  for (const p of params)
  {
    if (typeof p === 'string')
    {
      if (p.length > 0)
      {
        classes.push(p);
      }
    }
    else if (p)
    {
      for (const key in p) {
        const value = p[key];

        if (Boolean(value))
        {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}