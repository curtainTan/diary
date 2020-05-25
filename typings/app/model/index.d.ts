// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportArtlabel from '../../../app/model/artlabel';
import ExportLabel from '../../../app/model/label';
import ExportMood from '../../../app/model/mood';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Artlabel: ReturnType<typeof ExportArtlabel>;
    Label: ReturnType<typeof ExportLabel>;
    Mood: ReturnType<typeof ExportMood>;
  }
}
