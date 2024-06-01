import"./Toggle.css"


export const Toggle=({handleChange, isChecked}) =>{
    return(
        <div className="toggle-container">
            <span className="toogle-icon">🌞</span>
            <input
            type="checkbox"
            id="toogle"
            className="toggle"
            onChange={handleChange}
            checked={isChecked}
            />
            <label htmlFor="toogle" className="toogle-label"></label>
            <span className="toogle-icon">🌜</span>
        </div>
    );
};