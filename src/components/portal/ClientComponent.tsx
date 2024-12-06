"use client"
import { useEffect } from "react";
import { useCompanyStore } from "@/store/module/company";
import { CompanyInfo } from "@/schema/company";
export default function ClientComponent({
  initialCompanyInfo
}: {
  initialCompanyInfo: CompanyInfo
}) {
  const setCompanyInfo = useCompanyStore((state) => state.setCompanyInfo);

  useEffect(() => {
    setCompanyInfo(initialCompanyInfo);
  }, [initialCompanyInfo, setCompanyInfo]);

  return (
    <></>
  )
}
