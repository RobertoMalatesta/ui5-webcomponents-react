import { addCustomCSS } from '@ui5/webcomponents-base/dist/Theming';
import { createComponentStyles } from '@ui5/webcomponents-react-base/lib/createComponentStyles';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/lib/StyleClassHelper';
import { useConsolidatedRef } from '@ui5/webcomponents-react-base/lib/useConsolidatedRef';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/lib/usePassThroughHtmlProps';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { PlacementType } from '@ui5/webcomponents-react/lib/PlacementType';
import { ResponsivePopover } from '@ui5/webcomponents-react/lib/ResponsivePopover';
import React, { Children, cloneElement, FC, forwardRef, ReactElement, RefObject } from 'react';
import { Ui5ResponsivePopoverDomRef } from '../../interfaces/Ui5ResponsivePopoverDomRef';
import { ButtonPropTypes } from '../../webComponents/Button';
import { ResponsivePopoverPropTypes } from '../../webComponents/ResponsivePopover';
import styles from './ActionSheet.jss';

export interface ActionSheetPropTypes extends ResponsivePopoverPropTypes {
  placement?: PlacementType;
  children?: ReactElement<ButtonPropTypes> | ReactElement<ButtonPropTypes>[];
}

const useStyles = createComponentStyles(styles, { name: 'ActionSheet' });

addCustomCSS(
  'ui5-button',
  `
  :host([data-is-action-sheet-button]) .ui5-button-root {
    justify-content: flex-start;
  }
  `
);

/**
 * <code>import { ActionSheet } from '@ui5/webcomponents-react/lib/ActionSheet';</code>
 */
const ActionSheet: FC<ActionSheetPropTypes> = forwardRef(
  (props: ActionSheetPropTypes, ref: RefObject<Ui5ResponsivePopoverDomRef>) => {
    const {
      children,
      style,
      slot,
      className,
      allowTargetOverlap,
      headerText,
      horizontalAlign,
      initialFocus,
      modal,
      noArrow,
      placementType,
      verticalAlign,
      footer,
      header,
      onAfterClose,
      onAfterOpen,
      onBeforeClose,
      onBeforeOpen
    } = props;

    const classes = useStyles();

    const actionSheetClasses = StyleClassHelper.of(classes.actionSheet);
    if (className) {
      actionSheetClasses.put(className);
    }

    const popoverRef: RefObject<Ui5ResponsivePopoverDomRef> = useConsolidatedRef(ref);

    const onActionButtonClicked = (handler) => (e) => {
      popoverRef.current.close();
      if (typeof handler === 'function') {
        handler(e);
      }
    };

    const renderActionSheetButton = (element, index) => {
      return cloneElement(element, {
        key: index,
        design: ButtonDesign.Transparent,
        onClick: onActionButtonClicked(element.props.onClick),
        'data-is-action-sheet-button': ''
      });
    };

    const passThroughProps = usePassThroughHtmlProps(props, [
      'onAfterClose',
      'onAfterOpen',
      'onBeforeClose',
      'onBeforeOpen'
    ]);

    return (
      <ResponsivePopover
        ref={popoverRef}
        style={style}
        slot={slot}
        className={actionSheetClasses.valueOf()}
        allowTargetOverlap={allowTargetOverlap}
        headerText={headerText}
        horizontalAlign={horizontalAlign}
        initialFocus={initialFocus}
        modal={modal}
        noArrow={noArrow}
        placementType={placementType}
        verticalAlign={verticalAlign}
        footer={footer}
        header={header}
        onAfterClose={onAfterClose}
        onAfterOpen={onAfterOpen}
        onBeforeClose={onBeforeClose}
        onBeforeOpen={onBeforeOpen}
        {...passThroughProps}
      >
        {Children.map(children, renderActionSheetButton)}
      </ResponsivePopover>
    );
  }
);

ActionSheet.defaultProps = {
  placement: PlacementType.Bottom
};
ActionSheet.displayName = 'ActionSheet';

export { ActionSheet };
