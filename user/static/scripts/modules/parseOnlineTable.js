if(typeof onlineProducts != 'undefine'){
	var trs = [],
	i=0,
	items,
	item,
	itemUrl;

	try{
		for(var p in onlineProducts){
			items = onlineProducts[p];
			
			if(items.length){
				for(var j=0;j<items.length;j++){
					item = items[j];
					itemUrl = item.bidLink.replace(' ','');
					item.amountStr = item.amountStr.replace(',','')*1;
					if(item.amountStr>10000){
						item.amountStr = Math.round(item.amountStr/10000*100)/100+'万';
					}else{
						item.amountStr +='元';
					}

					item.processStr = item.processStr.replace('%','');
					item.rateStr = item.rateStr.replace('%','');
					item.rateStr = item.rateStr.replace('日化利率：','');
					item.deadlineStr = item.deadlineStr.replace('个','');

					i++;
		            if(p=='lufax'){
		                itemUrl='//affiliate.lufax.com/action?t=409451&s=C010&lp='+encodeURIComponent('//list.lufax.com'+itemUrl);
		            }
					trs.push([
						'<tr '+(i%2==0?'class="odd"':'')+'>',
						'<td class="platform-name">'+(arrP2pCompanys[p]?arrP2pCompanys[p]:p)+'</td>',
						'<td title="'+item.reasonStr+'" class="item-title"><a rel="nofflow" href="'+itemUrl+'" target="_blank">'+item.reasonStr+'</a></td>',
						'<td class="item-amount">'+item.amountStr+'</td>',
						'<td class="item-process">'+item.processStr+'</td>',
						'<td class="rate-item"><span class="rate">'+item.rateStr+'</span>%</td>',
						'<td class="period-item">'+item.deadlineStr+'</td>',
						'<td class="item-type">'+item.type.substr(0,8)+'</td>',
                        '<td class="last">'+item.repayTypeStr+'</td>',
						'</tr>'
					].join(''));
				}
			}
		}
	}catch(e){}

	if(trs.length)
		$('#online-products tbody').html(trs.join(''));
}