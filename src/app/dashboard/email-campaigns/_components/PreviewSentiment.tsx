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
  filterSentiment,
}: {
  filterSentiment: parsedBackSentimentType | null;
}) => {
  const objectKeyLength =
    filterSentiment && typeof filterSentiment === "object"
      ? Object.keys(filterSentiment).length
      : 0;

  return (
    <Sheet>
      <SheetTrigger className="bg-[#8A43FC] hover:bg-[#7C34F0] px-5 py-2 rounded text-sm font-semibold border-[#8A43FC] w-full md:w-52">
        View Sentiment Insights
      </SheetTrigger>
      {objectKeyLength == 0 ? (
        <SheetContent className="bg-[#212121] text-white border-white/15">
          <SheetDescription className="text-white/70 text-sm leading-relaxed">
            <p className="pt-6">
              Once formio have enough feedback to analyze your form sentiment
              overview will be shown here.
            </p>
          </SheetDescription>
        </SheetContent>
      ) : (
        <SheetContent className="bg-[#212121] text-white border-white/15">
          <SheetHeader className="text-white">
            <SheetTitle className="text-white">Sentiment</SheetTitle>
            <SheetDescription className="text-white/70 text-sm leading-relaxed capitalize font-bold">
              {filterSentiment?.overall_sentiment}
            </SheetDescription>
          </SheetHeader>
          {filterSentiment?.overview === " " && (
            <SheetHeader className="text-white">
              <SheetTitle className="text-white pt-6">
                Overall sentiment
              </SheetTitle>
              <SheetDescription className="text-white/70  text-sm leading-relaxed">
                {filterSentiment?.overview}
              </SheetDescription>
            </SheetHeader>
          )}

          {/* recommendation */}
          {filterSentiment?.recommendations !== "" && (
            <SheetHeader className="text-white">
              <SheetTitle className="text-white pt-6">
                Recommendations
              </SheetTitle>
              <SheetDescription className="text-white/70 text-sm leading-relaxed">
                {filterSentiment?.recommendations}
              </SheetDescription>
            </SheetHeader>
          )}
          {/* score */}
          {filterSentiment?.score !== null && (
            <SheetHeader className="text-white">
              <SheetTitle className="text-white pt-6">
                Engagement & Action Score
              </SheetTitle>
              <SheetDescription className="text-white/70 text-sm leading-relaxed">
                <span>
                  {typeof filterSentiment?.score === "number"
                    ? `${filterSentiment.score * 100}%`
                    : "N/A"}
                </span>

                <div className="mt-2 text-white/70">
                  {typeof filterSentiment?.score === "number" ? (
                    filterSentiment.score < 0 ? (
                      <p>🔴 Risk of Churn, Immediate Attention Needed.</p>
                    ) : filterSentiment.score === 0.5 ? (
                      <p>⚪ Neutral Engagement, Needs More Nurturing.</p>
                    ) : (
                      <p>
                        🟢 Strong Engagement, Opportunity for Positive Action.
                      </p>
                    )
                  ) : (
                    <p>⚠️ No sentiment score available.</p>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          )}
        </SheetContent>
      )}
    </Sheet>
  );
};

export default PreviewSentiment;
