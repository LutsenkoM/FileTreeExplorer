import { RouteOff } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";
import { EmptyState } from "../components/ui/EmptyState";
import { Panel } from "../components/ui/Panel";
import { ROUTES } from "../constants/routes";

export const NotFoundPage = () => {
  return (
    <PageContainer
      title="Page Not Found"
      description="The requested page does not exist in FileTree Explorer."
    >
      <Panel className="flex min-h-[420px] items-center justify-center p-8">
        <div className="text-center">
          <EmptyState
            title="Route not found"
            description="Check the address or go back to the Home page."
            icon={<RouteOff size={32} />}
            markerClassName="size-16"
          />

          <Link
            className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4"
            to={ROUTES.HOME}
          >
            Go to Home
          </Link>
        </div>
      </Panel>
    </PageContainer>
  );
};
