import {ResolveFn} from '@angular/router';

export const projectResolver: ResolveFn<any> = (route, state) => {
    return route.paramMap.get('project');
};
