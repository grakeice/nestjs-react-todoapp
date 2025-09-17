import type { JSX } from "react";

import { Plus } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

interface AppSidebarProps {
	setModalOpenedStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppSidebar({
	setModalOpenedStatus,
}: AppSidebarProps): JSX.Element {
	const handleNewTaskClicked = () => {
		setModalOpenedStatus(true);
	};
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton onClick={handleNewTaskClicked} asChild>
									<div className="cursor-pointer">
										<Plus />
										<span>新規作成</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
