import { m } from "motion/react";
import { LATEST_UPDATES } from "./latestUpdates.js";
import { fadeRise, staggerGroup, VIEWPORT } from "../../lib/motion.jsx";
import { SectionIntro, HomeButton, handleCardKeyDown } from "./parts.jsx";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatDate(iso) {
  const month = MONTHS[Number(iso.slice(5, 7)) - 1] || "";
  return `${month} ${Number(iso.slice(8, 10))}`;
}

export default function LatestSection({ navigate }) {
  return (
    <section className="home-section alt" style={{ "--section-tint": "rgba(200,152,48,0.05)" }}>
      <div className="home-container">
        <SectionIntro index="05" kicker="Latest" title="The site keeps moving">
          New experiments, kits, and research land regularly. The three most recent:
        </SectionIntro>
        <m.div
          className="latest-list"
          variants={staggerGroup(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {LATEST_UPDATES.map((item) => {
            const openPage = () => navigate(item.url.replace(/^\//, ""));
            return (
              <m.div
                key={item.id}
                role="button"
                tabIndex={0}
                className="latest-row"
                aria-label={`${item.title} — read more`}
                onClick={openPage}
                onKeyDown={(event) => handleCardKeyDown(event, openPage)}
                variants={fadeRise}
              >
                <span className="latest-date">{formatDate(item.date)}</span>
                <span className="latest-body">
                  <span className="latest-title">{item.title}</span>
                  <span className="latest-blurb">{item.blurb}</span>
                </span>
                <span className="latest-arrow" aria-hidden="true">→</span>
              </m.div>
            );
          })}
          <m.div className="latest-cta" variants={fadeRise}>
            <HomeButton variant="ghost" onClick={() => navigate("whats-new")}>All updates</HomeButton>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
