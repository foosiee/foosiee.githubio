import { createContext } from 'react';
import config from '../config.json';
import { Config } from '../types';

const ConfigContext = createContext(config as Config);

export default ConfigContext;
