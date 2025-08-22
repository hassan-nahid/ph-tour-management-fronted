import { DeleteConfirmation } from "@/components/DeleteConfirmation"
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTourTypesQuery, useRemoveTourTypesMutation } from "@/redux/features/tour/tour.api"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [removeTourType] = useRemoveTourTypesMutation()
  const { data } = useGetTourTypesQuery({ page: currentPage, limit })
  console.log(currentPage)

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...")
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const totalPage = data?.meta?.totalPage || 1;


  return (
    <div className="max-w-7xl mx-auto px-5 w-full">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      {/* Set Limit Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Set Limit</label>
        <Select value={String(limit)} onValueChange={val => setLimit(Number(val))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map(option => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            {data?.data?.map((item: { name: string, _id: string }) => (
              <TableRow key={item?._id}>
                <TableCell className="font-medium w-full">{item?.name}</TableCell>
                <TableCell className="w-full">
                  <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}><Button className="sm"><Trash2 /></Button></DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {
        totalPage > 1 && (
          <div className="flex justify-start mt-4">
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                  {
                    Array.from({ length: totalPage }, (_, index) => index + 1).map(page => (
                      <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                        <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                      </PaginationItem>
                    ))

                  }
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)}
                      className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AddTourType