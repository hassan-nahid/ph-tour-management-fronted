import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal"
import { Button } from "@/components/ui/button"
import { Table, TableBody,TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { Trash2 } from "lucide-react"

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined)
  return (
    <div className="max-w-7xl mx-auto px-5 w-full">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal/>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map( (item: {name: string}) => (
              <TableRow key={item?.name}>
              <TableCell className="font-medium w-full">{item?.name}</TableCell>
              <TableCell className="w-full"><Button className="sm"><Trash2/></Button></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AddTourType