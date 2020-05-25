// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportBaseController from '../../../app/controller/baseController';
import ExportLabel from '../../../app/controller/label';
import ExportMood from '../../../app/controller/mood';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    baseController: ExportBaseController;
    label: ExportLabel;
    mood: ExportMood;
  }
}
