export function MacroNutrients({ img_macro, values_name, value }) {
    return <>
        <div className="macro">
            <img src={img_macro} alt="" />
            <div className="values">
                <div className="values_number">{value}</div>
                <div className="values_name">{values_name}</div>
            </div>
        </div>
    </>
}
