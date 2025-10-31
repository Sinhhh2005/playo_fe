import { Link, useLocation } from "react-router-dom";
import type { Venue } from "../../types"; // ✅ import cả hai type

interface BreadcrumbItem {
	label: string;
	path?: string;
}

interface BreadcrumbProps {
	venue?: Venue;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ venue }) => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	const items: BreadcrumbItem[] = pathnames.map((value, index) => {
		const to = "/" + pathnames.slice(0, index + 1).join("/");
		const isLast = index === pathnames.length - 1;

		const label =
			isLast && venue
				? venue.name
				: decodeURIComponent(
						value.charAt(0).toUpperCase() + value.slice(1)
				  );

		let path: string | undefined = !isLast ? to : undefined;

		// ✅ Fix 404 cho breadcrumb "Venues"
		if (value.toLowerCase() === "venues") {
			path = "/book"; // quay về trang danh sách sân
		}

		return { label, path };
	});

	return (
		<nav className="text-base font-normal text-gray-700 m-4 px-20">
			<ol className="flex items-center space-x-2">
				{items.map((item, index) => (
					<li key={index} className="flex items-center">
						{item.path ? (
							<Link
								to={item.path}
								className="hover:text-green-400 transition-colors"
							>
								{item.label}
							</Link>
						) : (
							<span className="text-gray-400">{item.label}</span>
						)}
						{index < items.length - 1 && (
							<span className="mx-2 text-gray-500">{">"}</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
