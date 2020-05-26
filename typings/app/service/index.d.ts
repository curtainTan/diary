// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportBaseService from '../../../app/service/baseService';
import ExportLabel from '../../../app/service/label';
import ExportMood from '../../../app/service/mood';

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    baseService: AutoInstanceType<typeof ExportBaseService>;
    label: AutoInstanceType<typeof ExportLabel>;
    mood: AutoInstanceType<typeof ExportMood>;
  }
}
