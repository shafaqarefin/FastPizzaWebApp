import { Link } from 'react-router-dom';
//eslint-disable-next-line
function Button({ children, disabled, to, type, onClick, customClass }) {
  const base =
    ' text-sm inline-block rounded-full bg-yellow-400 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 active:ring-offset-2 disabled:cursor-not-allowed ' +
    customClass;

  const stylesButton = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2  md:px-5 md:py-2.5 text-xs',
    secondary:
      'text-sm inline-block rounded-full  text-sm border-2 border-stone-300 font-semibold uppercase  tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 active:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
    round: base + ' px-2.5 py-1  md:px-3.5 md:py-2 text-xs',
  };

  if (to) {
    return (
      <Link className={stylesButton[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        disabled={disabled}
        className={stylesButton[type]}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={stylesButton[type]}>
      {children}
    </button>
  );
}

export default Button;
