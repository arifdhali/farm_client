import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge, Download, Eye, Filter, Pencil, Plus, Search,  Trash2 } from 'lucide-react'


const list = () => {
    return (
        <>

            <div className="space-y-4">

                {/* Search & Actions */}
                <div className="flex bg-white rounded-[10px] p-4 flex-col justify-between md:flex-row md:items-center gap-3">
                        <div className="relative w-100">
                        <Search className="absolute bg-gray left-3 top-2.5 text-muted-foreground" />
                        <Input
                            placeholder="Search by farmer name, address or mobile..."
                            className="pl-10 h-10 border"
                        />
                    </div>
                    <div className='flex gap-5 items-center'>

                    <Button variant="outline" className="gap-2 text-gray border hover:bg-primary hover:text-white cursor-pointer transition-all">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>

                    <Button variant="outline" className="gap-2 border-primary bg-primary text-white hover:border-gray hover:bg-white hover:text-primary cursor-pointer transition-all">
                        <Plus className="h-4 w-4" />
                        Add Farmer
                    </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead>Farmer Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Mobile Number</TableHead>
                                <TableHead>Farm Capacity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium text-[#323130] flex items-center gap-3">
                                    <img
                                        src="https://i.pravatar.cc/40?img=3"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    Samuel Green
                                </TableCell>
                                <TableCell>123 North Valley, Highland St.</TableCell>
                                <TableCell>+1 555-0101</TableCell>
                                <TableCell>5,000 birds</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700">Free</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center gap-3 text-muted-foreground">
                                        <Eye className="h-4 w-4 cursor-pointer" />
                                        <Pencil className="h-4 w-4 cursor-pointer" />
                                        <Trash2 className="h-4 w-4 cursor-pointer" />
                                    </div>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-3">
                                    <img
                                        src="https://i.pravatar.cc/40?img=5"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    Maria Rodriguez
                                </TableCell>
                                <TableCell>Plot 42, East Wing Industrial</TableCell>
                                <TableCell>+1 555-0102</TableCell>
                                <TableCell>10,000 birds</TableCell>
                                <TableCell>
                                    <Badge className="bg-orange-100 text-orange-700">
                                        Occupied
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center gap-3 text-muted-foreground">
                                        <Eye className="h-4 w-4 cursor-pointer" />
                                        <Pencil className="h-4 w-4 cursor-pointer" />
                                        <Trash2 className="h-4 w-4 cursor-pointer" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground border-t">
                        <span className='text-gray'>Showing 1 to 5 of 42 entries</span>
                        <div className="flex gap-2 paginations">
                            <Button className=' cursor-pointer hover:bg-primary hover:text-white  text-gray'  variant="outline" size="icon">‹</Button>
                            <Button  className=' cursor-pointer hover:bg-primary hover:text-white text-white' size="icon">1</Button>
                            <Button  className=' cursor-pointer hover:bg-primary hover:text-white text-gray' variant="outline" size="icon">2</Button>
                            <Button  className=' cursor-pointer hover:bg-primary hover:text-white text-gray' variant="outline" size="icon">3</Button>
                            <Button  className=' cursor-pointer hover:bg-primary hover:text-white text-gray' variant="outline" size="icon">›</Button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default list