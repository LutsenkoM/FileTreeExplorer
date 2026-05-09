import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const navigationItems = [
  { label: "Home", to: ROUTES.HOME },
  { label: "Tree", to: ROUTES.TREE },
];

export const Sidebar = () => {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border-soft bg-panel">
      <div className="flex h-16 items-center gap-3 border-b border-border-soft px-5">
        <div className="flex size-8 items-center justify-center rounded-md border border-primary/20 bg-primary-soft text-sm font-bold text-primary">
          FT
        </div>
        <span className="text-sm font-semibold text-slate-950">FileTree Explorer</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              clsx(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-soft text-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              )
            }
            end={item.to === ROUTES.HOME}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border-soft px-3 py-4">
        <NavLink
          className={({ isActive }) =>
            clsx(
              "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary-soft text-primary"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
            )
          }
          to={ROUTES.ABOUT}
        >
          About
        </NavLink>
      </div>
    </aside>
  );
};
