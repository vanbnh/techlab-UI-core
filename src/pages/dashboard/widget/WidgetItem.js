import QuickNote from './lib/QuickNote'
import Statistic from './lib/Statistic'
import AccountTable from './lib/table/Accounts'
import ClientTable from './lib/table/Clients'
import LocationTable from './lib/table/Locations'
import PostTable from './lib/table/Post'
import LocationReportTable from './lib/table/LocationReport'
import PostReportTable from './lib/table/PostReport'
import TaskLogTable from './lib/table/TaskLog'

const WidgetItem = ({
  item,
  isEdit,
  setItemDetail,
  onDuplicateItem,
  onRemoveItem,
  onSaveItem,
}) => {
  const renderContent = () => {
    const props = {
      item,
      isEdit,
      setItemDetail,
      onDuplicateItem,
      onRemoveItem,
      onSaveItem,
    }
    switch (item.type) {
      case 1:
        return <QuickNote {...props} />
      case 2:
        return <Statistic {...props} />
      case 3:
        return <AccountTable {...props} />
      case 4:
        return <ClientTable {...props} />
      case 5:
        return <LocationTable {...props} />
      case 6:
        return <PostTable {...props} />
      case 7:
        return <LocationReportTable {...props} />
      case 8:
        return <PostReportTable {...props} />
      case 9:
        return <TaskLogTable {...props} />
      default:
        return ''
    }
  }

  return renderContent()
}

export default WidgetItem
