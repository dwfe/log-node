import color from 'colors';
import {ILog} from './contract.js';


export function logErr(title: string, ...message: any[]): void {
  log({type: 'error', title, message});
}

export function logWarn(title: string, ...message: any[]): void {
  log({type: 'warning', title, message});
}

export function logSuccess(title: string, ...message: any[]): void {
  log({type: 'success', title, message});
}

export function logAction(title: string, asLine = true): void {
  log({type: 'action', title, asLine});
}

export function logOption(option: string, value: any, asLine = true): void {
  log({type: 'success', title: option, message: value, asLine});
}


export function log({type, title, message, asLine}: ILog): void {
  message = message
    ? Array.isArray(message) ? message : [message]
    : [];
  switch (type) {
    case 'error':
      title = title && color.black.bgRed(title);
      message = applyColor(message, color.red);
      break;
    case 'warning':
      title = title && color.black.bgYellow(title);
      message = applyColor(message, color.yellow);
      break;
    case 'success':
      title = title && color.black.bgGreen(title);
      message = applyColor(message, color.green);
      break;
    case 'action':
      title = title && color.black.bgCyan(title);
      message = applyColor(message, color.cyan);
      break;
    default:
      logErr('Logger:', `Unknown message type "${type}"`);
      throw '';
  }
  if (asLine) {
    if (title)
      console.log(title, ...message);
    else if (message)
      console.log(...message);
  } else {
    title && console.log(title);
    message.forEach((m: any) => console.log(m))
    console.log(' '); // empty line after message
  }
}

function applyColor(values: string[], colorFn: (value: string) => string): string[] {
  return values.map(colorFn);
}
