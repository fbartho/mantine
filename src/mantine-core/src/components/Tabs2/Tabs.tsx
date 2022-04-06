import React, { forwardRef } from 'react';
import {
  DefaultProps,
  ForwardRefWithStaticComponents,
  useMantineDefaultProps,
} from '@mantine/styles';
import { Box } from '../Box';
import { TabsList } from './TabsList/TabsList';
import { TabsPanel } from './TabsPanel/TabsPanel';
import { Tab } from './Tab/Tab';
import { TabsProvider, TabsProviderProps } from './TabsProvider';
import useStyles from './Tabs.styles';

export interface TabsProps
  extends TabsProviderProps,
    DefaultProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof TabsProviderProps> {}

type TabsComponent = ForwardRefWithStaticComponents<
  TabsProps,
  {
    List: typeof TabsList;
    Tab: typeof Tab;
    Panel: typeof TabsPanel;
  }
>;

const defaultProps: Partial<TabsProps> = {
  orientation: 'horizontal',
  loop: true,
  activateTabWithKeyboardEvents: true,
  allowTabDeactivation: false,
  unstyled: false,
  variant: 'default',
};

export const Tabs: TabsComponent = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    defaultValue,
    value,
    orientation,
    loop,
    activateTabWithKeyboardEvents,
    allowTabDeactivation,
    children,
    id,
    onTabChange,
    variant,
    className,
    unstyled,
    ...others
  } = useMantineDefaultProps('Tabs', defaultProps, props);

  const { classes, cx } = useStyles({ orientation }, { unstyled, name: 'Tabs' });

  return (
    <TabsProvider
      activateTabWithKeyboardEvents={activateTabWithKeyboardEvents}
      defaultValue={defaultValue}
      orientation={orientation}
      onTabChange={onTabChange}
      value={value}
      id={id}
      loop={loop}
      allowTabDeactivation={allowTabDeactivation}
      variant={variant}
      unstyled={unstyled}
    >
      <Box {...others} className={cx(classes.root, className)} id={id} ref={ref}>
        {children}
      </Box>
    </TabsProvider>
  );
}) as any;

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;

Tabs.displayName = '@mantine/core/Tabs';