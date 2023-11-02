import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";

export const CommonTextField = ({
    name, onChange, onBlur, value, sx, error, ref, disabled, className, select,
    helperText, variant, multiline, rows, label, inputRef, title, size, placeholder,
    InputProps, inputProps, type, titleStyle, required, fullWidth, titleClassName, autoFocus,
    onKeyDown, maxRows
}) => {

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
            {title && <span className={titleClassName} style={{ ...titleStyle }}>{title} {required && <span style={{ color: 'red' }}> &nbsp;*</span>}</span>}
            <TextField
                size={size ?? 'large'} sx={{ ...sx, }}
                variant={variant} ref={ref} disabled={disabled}
                value={value} name={name} onChange={onChange}
                onBlur={onBlur} error={error} multiline={multiline}
                helperText={helperText} rows={rows} label={label}
                inputRef={inputRef} type={type} fullWidth={fullWidth}
                InputProps={InputProps} inputProps={inputProps} className={className}
                select={select} placeholder={placeholder} autoFocus={autoFocus}
                onKeyDown={onKeyDown} maxRows={maxRows}
                autoComplete="off"
            />
        </Grid>
    );
}

export const CommonLoadingButton = ({ title, disabled, loading, size, className }) => {
    return (
        <LoadingButton className="save_button" size={size ?? "large"} type="submit" disabled={disabled} loading={loading}>
            {title}
        </LoadingButton>
    )
}