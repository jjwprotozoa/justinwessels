import {renderToString} from 'react-dom/server';
import App, {pageInfo} from './App';
export {pageInfo};
export const render = (path:string)=>renderToString(<App path={path}/>);
