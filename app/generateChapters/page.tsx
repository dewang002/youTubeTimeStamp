import MaxWidthWrapper from "@/components/common/MaxWidthWrapper"
import SubmissionButton from "@/components/SubmissionButton"
import { Input } from "@/components/ui/input"

const page = () => {
    return (
        <div>
            <MaxWidthWrapper>
                <div className="grid grid-cols-12 ">
                    <div className="lg:col-span-4 flex flex-col col-span-12">
                        <h1 className="font-black text-4xl">generate tiemstamps for your YouTube video</h1>
                        <p>build for creators, by creator.</p>
                        <form action="" className="my-4 flex flex-col gap-2">
                            <div>
                                <label htmlFor="">Enter your URL</label>
                                <Input name="link" placeholder="url . . ." />
                            </div>
                            <SubmissionButton text="Generate" />
                        </form>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default page