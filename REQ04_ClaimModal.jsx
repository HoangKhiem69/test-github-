import React, {useState} from 'react';

export default function REQ04_ClaimModal({report, onClose, onSuccess, api}) {
  const [evidence,setEvidence]=useState('');
  const [error,setError]=useState('');
  const [sending,setSending]=useState(false);
  async function submit(e) {
    e.preventDefault();
    if(evidence.trim().length<12){setError('Vui lòng nhập bằng chứng ít nhất 12 ký tự.');return;}
    setError('');setSending(true);
    try {
      await api('/claims',{method:'POST',body:JSON.stringify({foundReportId:report.id,evidence:evidence.trim()})});
      onSuccess?.('Đã gửi yêu cầu xác minh.');onClose();
    } catch(err) {setError(err.message||'Không thể gửi yêu cầu.');}
    finally {setSending(false);}
  }
  return <div className="req04-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget&&!sending)onClose()}}>
    <section className="req04-dialog" role="dialog" aria-modal="true" aria-labelledby="req04-title">
      <div className="req04-heading"><h3 id="req04-title">Xác minh quyền sở hữu</h3><button type="button" onClick={onClose} disabled={sending}>✕</button></div>
      <p>Bạn đang xin nhận: <strong>{report.itemName}</strong></p>
      <div className="req04-privacy" role="note">Bằng chứng chỉ hiển thị cho người giữ đồ và quản trị viên. Không nhập mật khẩu, OTP hoặc thông tin ngân hàng.</div>
      <form onSubmit={submit} noValidate>
        <label htmlFor="req04-evidence">Đặc điểm bí mật của món đồ *</label>
        <textarea id="req04-evidence" rows={5} maxLength={4000} value={evidence} aria-invalid={!!error} onChange={e=>{setEvidence(e.target.value);setError('')}} placeholder="Ví dụ: vết xước đặc biệt, phụ kiện riêng..."/>
        <small>Ít nhất 12 ký tự.</small>{error&&<p className="req04-error" role="alert">{error}</p>}
        <div className="req04-actions"><button type="button" onClick={onClose} disabled={sending}>Hủy</button><button type="submit" disabled={sending}>{sending?'Đang gửi...':'Gửi yêu cầu'}</button></div>
      </form>
    </section>
  </div>;
}
