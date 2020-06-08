/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isFunction } from './utils/typeChecks';

export class Emitter {
  constructor(_e = {}) {
    this._e = _e;
  }
  /**
   * Register an event handler for the given type.
   *
   * @param  type	Type of event to listen for, or `"*"` for all events
   * @param  handler Function to call in response to given event
   * @memberOf mitt
   */
  on(type, handler) {
    const handles = this._e;
    const a = handles[type] || [];
    a.push(handler);
    handles[type] = a;
    return this;
  }
  /**
   * Remove an event handler for the given type.
   *
   * @param  type	Type of event to unregister `handler` from, or `"*"`
   * @param  handler Handler function to remove
   * @memberOf mitt
   */
  off(type, handler) {
    const { _e } = this;
    if (type === null) {
      for (const key in _e) {
        if (_e.hasOwnProperty(key)) {
          delete _e[key];
        }
      }
    } else if (handler === null) {
      delete _e[type];
    } else if (isFunction(handler)) {
      const a = _e[type];
      if (a) {
        a.splice(a.indexOf(handler) >>> 0, 1);
      }
    }
    return this;
  }
  /**
   * Invoke all handlers for the given type.
   * @param type  The event type to invoke
   * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
   * @memberOf mitt
   */
  emit(type, ...args) {
    // TODO: asap ?
    // setTimeout(() => {
    const handles = this._e;
    const a = handles[type];
    if (a) {
      a.slice().map((cb) => {
        cb(...args);
      });
    }
    // }, 0);
    return this;
  }
}
