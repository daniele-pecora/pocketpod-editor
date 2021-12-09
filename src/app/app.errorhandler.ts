import {Injectable} from '@angular/core'
import {ErrorHandler} from '@angular/core'
/**
 * Created by daniele on 17.04.17.
 */

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error) {
    // handle the error

    // delegate to the default handler
    super.handleError(error);
  }
}
