export default function usePermissionGridTable(permissions) {
  const canSummary = permissions.includes('summary')
  const canPagination = permissions.includes('pagination')
  const canSelect = permissions.includes('selecting')
  const canReOrdering = permissions.includes('reordering')
  const canExport = permissions.includes('exporting')
  return {
    canSummary,
    canPagination,
    canSelect,
    canReOrdering,
    canExport,
  }
}
