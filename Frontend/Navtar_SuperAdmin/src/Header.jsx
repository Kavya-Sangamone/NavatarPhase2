import { Plus } from "lucide-react";
const Header = ({ title, subtitle, buttonLabel, onButtonClick, Icon = Shield }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <div className="logo-icon">
                        <Icon />
                    </div>
                    <div className="logo-text">
                        <h1>{title}</h1>
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                </div>

                {buttonLabel && onButtonClick && (
                    <button onClick={onButtonClick}>
                        <Plus />
                        {buttonLabel}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
