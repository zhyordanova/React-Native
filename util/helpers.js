export function getAccessibilityLabel(children, defaultLabel = 'Button') {
  return typeof children === 'string' ? children : defaultLabel;
}
