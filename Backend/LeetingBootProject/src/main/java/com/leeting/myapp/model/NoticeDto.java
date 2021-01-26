package com.leeting.myapp.model;

import org.springframework.web.multipart.MultipartFile;

public class NoticeDto {

	private int no;
	private String title;
	private String detail;
	private String date;
	private String writer;
	private int hit;
	private MultipartFile file1;
	private MultipartFile file2;
	private MultipartFile file3;
	public NoticeDto() {
		super();
	}
	public NoticeDto(int no, String title, String detail, String date, String writer, int hit, MultipartFile file1,
			MultipartFile file2, MultipartFile file3) {
		super();
		this.no = no;
		this.title = title;
		this.detail = detail;
		this.date = date;
		this.writer = writer;
		this.hit = hit;
		this.file1 = file1;
		this.file2 = file2;
		this.file3 = file3;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public MultipartFile getFile1() {
		return file1;
	}
	public void setFile1(MultipartFile file1) {
		this.file1 = file1;
	}
	public MultipartFile getFile2() {
		return file2;
	}
	public void setFile2(MultipartFile file2) {
		this.file2 = file2;
	}
	public MultipartFile getFile3() {
		return file3;
	}
	public void setFile3(MultipartFile file3) {
		this.file3 = file3;
	}
	@Override
	public String toString() {
		return "NoticeDto [no=" + no + ", title=" + title + ", detail=" + detail + ", date=" + date + ", writer="
				+ writer + ", hit=" + hit + ", file1=" + file1 + ", file2=" + file2 + ", file3=" + file3 + "]";
	}

	
}
