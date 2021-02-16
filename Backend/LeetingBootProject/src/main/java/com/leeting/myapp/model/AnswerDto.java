package com.leeting.myapp.model;

public class AnswerDto {
	
	private int no;
	private int questionno;
	private String detail;
	private String date;
	public AnswerDto() {
		super();
	}
	public AnswerDto(int no, int questionno, String detail, String date) {
		super();
		this.no = no;
		this.questionno = questionno;
		this.detail = detail;
		this.date = date;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public int getQuestionno() {
		return questionno;
	}
	public void setQuestionno(int questionno) {
		this.questionno = questionno;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "AnswerDto [no=" + no + ", questionno=" + questionno + ", detail=" + detail + ", date=" + date + "]";
	}
	
	
	
}
