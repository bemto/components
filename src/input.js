import { bemto } from '@bemto/core';

// TODO: add a factory-constructor for outputting the withSettings etc.
const input = {};

input.apply = ({
  children,
  disabled,
  type,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const { getProps, elements } = bemto(props);
  return {
    RootTagName: 'span',
    ControllerTagName: type === 'textarea' ? 'textarea' : 'input',
    __Root: getProps('__Root', { _disabled: !!disabled }),
    __OuterBefore: elements.__OuterBefore ? getProps('__OuterBefore') : null,
    __Layout: getProps('__Layout'),
    __View: getProps('__View', { 'aria-hidden': true }),
    __Before: elements.__Before ? getProps('__Before') : null,
    __ControllerWrap: getProps('__ControllerWrap'),
    __Placeholder: elements.__Placeholder ? getProps('__Placeholder', {
      'aria-hidden': true,
      _inactive: !props._empty || (props.__PlaceholderHint && !props._focus),
    }) : null,
    __PlaceholderHint:
      elements.__PlaceholderHint ? getProps('__PlaceholderHint', {
        _inactive: !props._empty || props._focus,
      }) : null,
    __Controller: getProps('__Controller', {
      type: type !== 'textarea' && (type || 'text') || undefined,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      children,
    }),
    __After: elements.__After ? getProps('__After') : null,
    __OuterAfter: elements.__OuterAfter ? getProps('__OuterAfter') : null,
  };
};

// Here in the bemto end we could have an inner wrapper inside around inner styles
// so we could pass an outer css function that could do the work there
// instead of just passing stuff through
const css = styles => styles;

input.styles = css`
  position: relative;
  z-index: 1;

  display: inline-block;
  display: inline-flex;

  box-sizing: border-box;
  width: 300px;
  max-width: 100%;

  &__OuterBefore,
  &__OuterAfter,
  &__Before,
  &__After {
    flex-shrink: 0;
  }

  &__Layout {
    position: relative; /* Optional */
    display: inline-block;
    display: inline-flex;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;

    cursor: text;
  }

  &__View {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }

  &__ControllerWrap {
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;
  }

  &__Placeholder,
  &__PlaceholderHint {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &_inactive {
      visibility: hidden;
    }
  }

  &__Controller {
    -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
    display: inline-block;
    vertical-align: baseline;

    resize: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-width: 0;
    padding: 0;
    margin: 0;
    border: none;

    font: inherit;

    color: inherit;
    background: transparent;
    border-radius: 0;
    box-shadow: none;

    &::-ms-clear {
      display: none;
    }
  }

  /* Fixes the iOS scroll issue, inputs still would be clickable as they have labels */
  @media (pointer: coarse) {
    &:not(&_focus) > * > * > &__Controller {
      pointer-events: none;
    }
  }
`;

// TODO: make them attached to components instead, to enable proper tree-shaking
// so they could be imported as `import { inputFocusStyles } from `@bemto/components`
input.focusStyles = (styles, css) => css`
  &__Controller:focus {
    outline: none;
  }

  &_focus > * > &__View {
    ${styles || ''}
  }
`;

input.hoverStyles = (styles, css) => styles.indexOf('&__') === -1 ? css`
  @media (pointer: fine) {
    :not(&_focus):not(&_disabled) > *:hover > &__View {
      ${styles}
    }
  }

  @supports (-moz-appearance:meterbar) {
    :not(&_focus):not(&_disabled) > *:hover > &__View {
      ${styles}
    }
  }
` : css`
  @media (pointer: fine) {
    ${styles}
  }

  @supports (-moz-appearance:meterbar) {
    ${styles}
  }
`;

input.hocusStyles = (styles, css) => css`
  &__Controller:focus {
    outline: none;
  }

  &_focus:not(&_disabled) > * > &__View {
    ${styles}
  }

  @media (pointer: fine) {
    *:not(&_disabled) > *:hover > &__View {
      ${styles}
    }
  }

  @supports (-moz-appearance:meterbar) {
    *:not(&_disabled) > *:hover > &__View {
      ${styles}
    }
  }
`;

export default input;
