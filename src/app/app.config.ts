import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {zh_CN, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import {provideAnimations} from '@angular/platform-browser/animations';

import {NZ_ICONS, NzIconModule} from "ng-zorro-antd/icon";
import { IconDefinition } from '@ant-design/icons-angular';
import {
  PlusOutline,
  BellOutline ,
  SettingOutline,
  EditOutline,
  ApartmentOutline,
  BlockOutline,
  AppstoreOutline,
  DeleteOutline,
  DownloadOutline,
  UploadOutline,
  UserOutline,
  ProfileOutline,
  EyeOutline,
  ReloadOutline,
  BackwardOutline,
  ArrowLeftOutline,

} from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [
  PlusOutline,
  BellOutline,
  SettingOutline,
  EditOutline,
  ApartmentOutline,
  BlockOutline,
  AppstoreOutline,
  DeleteOutline,
  DownloadOutline,
  UploadOutline,
  UserOutline,
  ProfileOutline,
  EyeOutline,
  ReloadOutline,
  BackwardOutline,
  ArrowLeftOutline,


];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(zh_CN),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    {provide: NZ_ICONS, useValue:icons},
  ]
};
