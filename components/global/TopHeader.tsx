import { Session } from "@supabase/supabase-js";
import SignOutButton from "./SignInOutButton";
import ThemeSwitcher from "./ThemeSwitcher";

interface TopHeaderProps {
  session: Session | null;
}
const TopHeader = ({ session }: TopHeaderProps) => {
  return (
    <div className=' border-b py-2'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div></div>
          <div className='flex'>
            <SignOutButton buttonSize='xs' session={session} />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
