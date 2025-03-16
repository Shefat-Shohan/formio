import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { parsedBackSentimentType } from "@/data/type";

const PreviewSentiment = ({
  parsedBackSentiment,
}: {
  parsedBackSentiment: parsedBackSentimentType | null;
}) => {
  return (
    <Sheet>
      <SheetTrigger className="bg-[#8A43FC] hover:bg-[#a167ff] px-5 py-2 rounded text-sm font-semibold border border-[#8A43FC] w-full md:w-52">
        Preview Sentiment
      </SheetTrigger>
      {parsedBackSentiment === null ? (
        <SheetContent className="bg-[#212121] text-white border-white/15">
          <SheetDescription className="text-white/70 text-sm leading-relaxed">
            <p className="pt-6">
              Once formio have enough feedback to analyze your form sentiment
              overview will be show here.
            </p>
          </SheetDescription>
        </SheetContent>
      ) : (
        <SheetContent className="bg-[#212121] text-white border-white/15">
          <SheetHeader className="text-white">
            <SheetTitle className="text-white">Sentiment</SheetTitle>
            <SheetDescription className="text-white/70 text-sm leading-relaxed capitalize font-bold">
              {parsedBackSentiment?.sentiment}
            </SheetDescription>
          </SheetHeader>
          <SheetHeader className="text-white">
            <SheetTitle className="text-white pt-6">
              Overall sentiment
            </SheetTitle>
            <SheetDescription className="text-white/70 text-sm leading-relaxed">
              {parsedBackSentiment?.overview}
            </SheetDescription>
          </SheetHeader>

          {/* recommendation */}
          {parsedBackSentiment?.recommendations !== "" && (
            <SheetHeader className="text-white">
              <SheetTitle className="text-white pt-6">
                Recommendations
              </SheetTitle>
              <SheetDescription className="text-white/70 text-sm leading-relaxed">
                {parsedBackSentiment?.recommendations}
              </SheetDescription>
            </SheetHeader>
          )}
        </SheetContent>
      )}
    </Sheet>
  );
};

export default PreviewSentiment;
