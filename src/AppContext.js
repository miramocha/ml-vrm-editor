import { createContext } from 'react';
import AppController from './controllers/appController';

export const GltfVrmParserContext = createContext(null);
export const AppControllerContext = createContext(new AppController());
