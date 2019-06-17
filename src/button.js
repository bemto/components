import { bemto } from '@bemto/core';

// TODO: add a factory-constructor for outputting the withSettings etc.
const button = {};

button.apply = ({ children, ...props }) => {
  const { getProps, elements } = bemto(props);
  return {
    RootTagName: props.href ? 'a' : 'button',
    __Root: getProps('__Root', {
      _disabled: !!props.disabled,
      type: !props.href ? (props.type || 'button') : undefined,
      tabIndex: props.disabled || props._disabled
        ? '-1'
        : ((props.href || !props.type) && '0' || undefined),
      role:
        !props.disabled
        && !props._disabled
        && !props.href
        && !props.type
        && 'button'
        || undefined,
    }),
    __Content: getProps('__Content', { tabIndex: -1 }),
    __BLHelper: elements.__Before ? getProps('__BLHelper') : null,
    __Before: elements.__Before ? getProps('__Before') : null,
    __After: elements.__After ? getProps('__After') : null,
    __Text: getProps('__Text', { children }),
    __Focus: getProps('__Focus'),
  };
};

// Here in the bemto end we could have an inner wrapper inside around inner styles
// so we could pass an outer css function that could do the work there
// instead of just passing stuff through
const css = styles => styles;

button.styles = css`
 -moz-appearance: none;

  position: relative;
  z-index: 1;

  flex-shrink: 0;

  display: inline-block;
  vertical-align: baseline;
  overflow: visible; /* Needed for IE */

  box-sizing: border-box;
  max-width: 100%;
  padding: 0;
  border: none;
  margin: 0;

  border-radius: 0;

  white-space: nowrap;

  text-align: center; /* TODO: Apply only when there is a set width in style? */
  justify-content: center;

  font: inherit;
  text-decoration: none;

  color: inherit;
  background: transparent;

  cursor: pointer;
  user-select: none;

  &_disabled {
    pointer-events: none;
  }

  &::-moz-focus-inner {
    padding: 0;
    border: none;
  }

  &__Content {
    position: relative;

    display: block;
    display: inline-flex;

    box-sizing: border-box;
    width: 100%;
    border-radius: inherit; /* [4] */
  }

  &__Focus {
    visibility: hidden;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: inherit; /* [4] */
  }

  /* We need this, so extra elements would not break our baseline */
  /* TODO: insert it only when there is __Before/__After? */
  &__BLHelper {
    float: left; /* [1] */
    width: 0;
    min-width: 0; /* [2] */

    &::before {
      content: "\\a0"; /* nbsp */
    }
  }

  &__Text {
    display: block;

    flex-shrink: 1;
    flex-basis: 100%; /* Not width, as [1] */

    overflow: hidden;
    text-overflow: ellipsis;

    min-width: 0; /* [2] */

    /* [3] */
    *:root &,
    &:-ms-input-placeholder {
      flex-basis: auto;
      width: 100%;
    }
  }

  &__Before {
    align-self: center;
    flex-shrink: 0;
    float: left;
  }

  &__After {
    order: 1;
    align-self: center;
    flex-shrink: 0;
    float: right;
  }
`;

export default button;
