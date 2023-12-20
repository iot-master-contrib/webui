import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {MatPaginatorIntl} from "@angular/material/paginator";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {provide: LOCALE_ID, useValue: "zh-CN"},
    { provide: MatPaginatorIntl, useValue: myPaginator() },
  ]
};

function dutchRangeLabel(page: number, pageSize: number, length: number) {
  if (length === 0 || pageSize === 0) {
    return `0 到 ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} 条/总共 ${length}条`;
};

export function myPaginator(): any {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = '每页数据条数:';
  paginatorIntl.nextPageLabel = '下一页';
  paginatorIntl.previousPageLabel = '上一页';
  paginatorIntl.firstPageLabel = '首页';
  paginatorIntl.lastPageLabel = '尾页';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
