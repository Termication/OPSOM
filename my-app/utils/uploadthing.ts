import { ourFileRouter } from "@/app/api/uploadthing/core";


import { generateReactHelpers } from "@uploadthing/react";

export const { useUloadThing }
    = generateReactHelpers<ourFileRouter>();