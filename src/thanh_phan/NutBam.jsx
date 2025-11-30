function NutBam({ 
  children, 
  onClick, 
  loai = 'chinh', 
  testId,
  disabled = false 
}) {
  const styles = {
    chinh: {
      padding: '0.75rem 1.5rem',
      background: '#2d5016',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: 'bold',
      opacity: disabled ? 0.6 : 1
    },
    phu: {
      padding: '0.75rem 1.5rem',
      background: 'transparent',
      color: '#2d5016',
      border: '1px solid #2d5016',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    },
    nguyHiem: {
      padding: '0.75rem 1.5rem',
      background: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: 'bold',
      opacity: disabled ? 0.6 : 1
    }
  }

  return (
    <button
      data-testid={testId || 'nut-bam'}
      onClick={onClick}
      disabled={disabled}
      style={styles[loai] || styles.chinh}
    >
      {children}
    </button>
  )
}

export default NutBam

