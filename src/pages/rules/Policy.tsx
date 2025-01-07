import { FC } from "react";
import RulesTabs from "../../components/rules/RulesTabs";
import { Sidebar } from "../../components";
import ScrollToTop from "../../utils/scroll";

const Policy: FC = () => {
  return (
    <>
      <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <ScrollToTop />
        <RulesTabs />
      </div>
    </>
  );
};

export default Policy;
