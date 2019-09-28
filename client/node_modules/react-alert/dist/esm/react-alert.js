import React, { createContext, useMemo, useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Transition, TransitionGroup } from 'react-transition-group';
import { createPortal } from 'react-dom';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var Context = createContext();

var positions = {
  TOP_LEFT: 'top left',
  TOP_CENTER: 'top center',
  TOP_RIGHT: 'top right',
  MIDDLE_LEFT: 'middle left',
  MIDDLE: 'middle',
  MIDDLE_RIGHT: 'middle right',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_CENTER: 'bottom center',
  BOTTOM_RIGHT: 'bottom right'
};
var types = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error'
};
var transitions = {
  FADE: 'fade',
  SCALE: 'scale'
};

var getStyles = function getStyles(position) {
  var initialStyles = {
    position: 'fixed'
  };

  switch (position) {
    case positions.TOP_LEFT:
      return _objectSpread({
        top: 0,
        left: 0
      }, initialStyles);

    case positions.TOP_CENTER:
      return _objectSpread({
        top: 0,
        left: '50%',
        transform: 'translate(-50%, 0%)'
      }, initialStyles);

    case positions.TOP_RIGHT:
      return _objectSpread({
        top: 0,
        right: 0
      }, initialStyles);

    case positions.MIDDLE_LEFT:
      return _objectSpread({
        bottom: '50%',
        left: 0
      }, initialStyles);

    case positions.MIDDLE:
      {
        return _objectSpread({
          bottom: '50%',
          left: '50%',
          transform: 'translate(-50%, 0%)'
        }, initialStyles);
      }

    case positions.MIDDLE_RIGHT:
      return _objectSpread({
        bottom: '50%',
        right: 0
      }, initialStyles);

    case positions.BOTTOM_LEFT:
      return _objectSpread({
        bottom: 0,
        left: 0
      }, initialStyles);

    case positions.BOTTOM_CENTER:
      return _objectSpread({
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0%)'
      }, initialStyles);

    case positions.BOTTOM_RIGHT:
      return _objectSpread({
        right: 0,
        bottom: 0
      }, initialStyles);
  }
};

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children,
      _ref$options = _ref.options,
      position = _ref$options.position,
      containerStyle = _ref$options.containerStyle,
      props = _objectWithoutProperties(_ref, ["children", "options"]);

  var styles = useMemo(function () {
    return getStyles(position);
  }, [position]);
  return children.length > 0 && React.createElement("div", _extends({
    style: _objectSpread({}, styles, containerStyle)
  }, props), children);
};

var _defaultStyle, _transitionStyles;
var duration = 250;
var defaultStyle = (_defaultStyle = {}, _defineProperty(_defaultStyle, transitions.FADE, {
  transition: "opacity ".concat(duration, "ms ease"),
  opacity: 0
}), _defineProperty(_defaultStyle, transitions.SCALE, {
  transform: 'scale(1)',
  transition: "all ".concat(duration, "ms ease-in-out")
}), _defaultStyle);
var transitionStyles = (_transitionStyles = {}, _defineProperty(_transitionStyles, transitions.FADE, {
  entering: {
    opacity: 0
  },
  entered: {
    opacity: 1
  }
}), _defineProperty(_transitionStyles, transitions.SCALE, {
  entering: {
    transform: 'scale(0)'
  },
  entered: {
    transform: 'scale(1)'
  },
  exiting: {
    transform: 'scale(0)'
  },
  exited: {
    transform: 'scale(1)'
  }
}), _transitionStyles);

var Transtion = function Transtion(_ref) {
  var children = _ref.children,
      type = _ref.type,
      props = _objectWithoutProperties(_ref, ["children", "type"]);

  return React.createElement(Transition, _extends({}, props, {
    timeout: duration
  }), function (state) {
    return React.createElement("div", {
      style: _objectSpread({}, defaultStyle[type], transitionStyles[type][state])
    }, children);
  });
};

var groupBy = function groupBy(array, fn) {
  return array.reduce(function (result, item) {
    var key = fn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
    return result;
  }, {});
};

var Provider = function Provider(_ref) {
  var children = _ref.children,
      offset = _ref.offset,
      position = _ref.position,
      timeout = _ref.timeout,
      type = _ref.type,
      transition = _ref.transition,
      containerStyle = _ref.containerStyle,
      AlertComponent = _ref.template,
      Context$$1 = _ref.context,
      props = _objectWithoutProperties(_ref, ["children", "offset", "position", "timeout", "type", "transition", "containerStyle", "template", "context"]);

  var root = useRef(null);
  var timersId = useRef([]);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      alerts = _useState2[0],
      setAlerts = _useState2[1];

  useEffect(function () {
    root.current = document.createElement('div');
    document.body.appendChild(root.current);
    return function () {
      timersId.current.forEach(clearTimeout);
      if (root.current) document.body.removeChild(root.current);
    };
  }, []);

  var remove = function remove(alert) {
    setAlerts(function (prevState) {
      var lengthBeforeRemove = prevState.length;
      var alerts = prevState.filter(function (a) {
        return a.id !== alert.id;
      });

      if (lengthBeforeRemove > alerts.length && alert.options.onClose) {
        alert.options.onClose();
      }

      return alerts;
    });
  };

  var show = function show() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var id = Math.random().toString(36).substr(2, 9);

    var alertOptions = _objectSpread({
      position: options.position || position,
      timeout: timeout,
      type: type
    }, options);

    var alert = {
      id: id,
      message: message,
      options: alertOptions
    };

    alert.close = function () {
      return remove(alert);
    };

    if (alert.options.timeout) {
      var timerId = setTimeout(function () {
        remove(alert);
        timersId.current.splice(timersId.current.indexOf(timerId), 1);
      }, alert.options.timeout);
      timersId.current.push(timerId);
    }

    setAlerts(function (alerts) {
      return alerts.concat(alert);
    });
    if (alert.options.onOpen) alert.options.onOpen();
    return alert;
  };

  var success = function success() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options.type = types.SUCCESS;
    return show(message, options);
  };

  var error = function error() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options.type = types.ERROR;
    return show(message, options);
  };

  var info = function info() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options.type = types.INFO;
    return show(message, options);
  };

  var alertContext = {
    root: root.current,
    alerts: alerts,
    show: show,
    remove: remove,
    success: success,
    error: error,
    info: info
  };
  var alertsByPosition = groupBy(alerts, function (alert) {
    return alert.options.position;
  });
  return React.createElement(Context$$1.Provider, {
    value: alertContext
  }, children, root.current && createPortal(React.createElement(React.Fragment, null, Object.values(positions).map(function (position) {
    return React.createElement(TransitionGroup, _extends({
      appear: true,
      key: position,
      options: {
        position: position,
        containerStyle: containerStyle
      },
      component: Wrapper
    }, props), alertsByPosition[position] ? alertsByPosition[position].map(function (alert) {
      return React.createElement(Transtion, {
        type: transition,
        key: alert.id
      }, React.createElement(AlertComponent, _extends({
        style: {
          margin: offset
        }
      }, alert)));
    }) : null);
  })), root.current));
};

Provider.propTypes = {
  offset: PropTypes.string,
  position: PropTypes.oneOf(Object.values(positions)),
  timeout: PropTypes.number,
  type: PropTypes.oneOf(Object.values(types)),
  transition: PropTypes.oneOf(Object.values(transitions)),
  containerStyle: PropTypes.object,
  template: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  context: PropTypes.shape({
    Provider: PropTypes.object,
    Consumer: PropTypes.object
  })
};
Provider.defaultProps = {
  offset: '10px',
  position: positions.TOP_CENTER,
  timeout: 0,
  type: types.INFO,
  transition: transitions.FADE,
  containerStyle: {
    zIndex: 100
  },
  context: Context
};

var useAlert = function useAlert(Context$$1) {
  return useContext(Context$$1 || Context);
};

var withAlert = function withAlert() {
  var Context$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Context;
  return function (WrappedComponent) {
    var WithAlert = function WithAlert(props, forwardedRef) {
      return React.createElement(Context$$1.Consumer, null, function (alert) {
        return React.createElement(WrappedComponent, _extends({
          ref: forwardedRef
        }, props, {
          alert: alert
        }));
      });
    };

    WithAlert.displayName = "WithAlert(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
    return React.forwardRef(WithAlert);
  };
};

export { Provider, useAlert, withAlert, positions, types, transitions };
