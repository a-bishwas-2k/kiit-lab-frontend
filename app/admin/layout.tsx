
// import { Sidebar } from "lucide-react";
import Sidebar from "@/components/Problems/Sidebar";
import { authOption } from "@/lib/AuthOption/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title:"Admin Dashboard",
};
const AdminLayout = async ({ children }:{children: React.ReactNode;}) => {
    // const users = await getData()

    const session  = await getServerSession(authOption);
    if(!session || !session.isAdmin) return redirect("/");
    return (
        // <main>

<div className="flex flex-row h-screen bg-[#141313] w-full ">

            <Sidebar/>
            {children}

</div>
        
        // </main>
     
    )
  }
  
  export default AdminLayout