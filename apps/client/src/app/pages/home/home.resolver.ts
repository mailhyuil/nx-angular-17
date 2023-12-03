import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

export const HomeResolver: ResolveFn<string> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // ajax call to get data
  await delay(3000);
  return 'hello world';
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
