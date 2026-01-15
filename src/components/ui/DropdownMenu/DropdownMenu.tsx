'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenuProps,
  DropdownMenuPortalProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
} from './DropdownMenu.types'
import { dropdownMenuStyles } from './DropdownMenu.styles'
import { DROPDOWN_MENU_CONSTANTS } from '@/resources/resources'

function DropdownMenu({ ...props }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.ROOT} {...props} />
  )
}

function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return (
    <DropdownMenuPrimitive.Portal
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.PORTAL}
      {...props}
    />
  )
}

function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.TRIGGER}
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = DROPDOWN_MENU_CONSTANTS.DEFAULT_SIDE_OFFSET,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.CONTENT}
        sideOffset={sideOffset}
        className={cn(dropdownMenuStyles.content, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return (
    <DropdownMenuPrimitive.Group data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.GROUP} {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = DROPDOWN_MENU_CONSTANTS.VARIANTS.DEFAULT,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.ITEM}
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownMenuStyles.item, className)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.CHECKBOX_ITEM}
      className={cn(dropdownMenuStyles.checkboxItem, className)}
      checked={checked}
      {...props}
    >
      <span className={dropdownMenuStyles.checkboxIndicator}>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className={dropdownMenuStyles.checkIcon} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.RADIO_GROUP}
      {...props}
    />
  )
}

function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.RADIO_ITEM}
      className={cn(dropdownMenuStyles.radioItem, className)}
      {...props}
    >
      <span className={dropdownMenuStyles.radioIndicator}>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className={dropdownMenuStyles.radioIcon} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.LABEL}
      data-inset={inset}
      className={cn(dropdownMenuStyles.label, className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.SEPARATOR}
      className={cn(dropdownMenuStyles.separator, className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.SHORTCUT}
      className={cn(dropdownMenuStyles.shortcut, className)}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.SUB} {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.SUB_TRIGGER}
      data-inset={inset}
      className={cn(dropdownMenuStyles.subTrigger, className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className={dropdownMenuStyles.chevronIcon} />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({ className, ...props }: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot={DROPDOWN_MENU_CONSTANTS.DATA_SLOTS.SUB_CONTENT}
      className={cn(dropdownMenuStyles.subContent, className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
